/**
 * @NApiVersion 2.1
 */

import * as NRecord from "N/record";
import * as NLog from "N/log";
import * as NQuery from "N/query";
import * as NCache from "N/cache";

import { StronglyTypedRecord, AutoGetSet } from "SuiteScripts/MISSharedLibraries/RecordLibrary";

export class TcCaseTerritory extends StronglyTypedRecord<NRecord.Type.SUPPORT_CASE> {
    
    @AutoGetSet()
    accessor assigned: number | null = null;

    public main(): void {
        const rules = this._getRules();
        const firstEmail = this._getFirstMessage();

        if (!rules.length) {
            return;
        }

        if (!firstEmail) {
            return;
        }

        const routingDecision = this._evaluateMatch(rules, firstEmail);
        NLog.debug("routingDecision", routingDecision);

        if (!routingDecision) {
            return;
        }

        this._applyAssignment(routingDecision);
    }

    private _applyAssignment(match: RoutingDecision): void {
        if (!match) {
            NLog.debug("caseRouting", "No matching TO/CC found, skipping routing.");
            return;
        }

        if (match.matchedField === "TO" || (match.matchedField === "CC" && match.allowWhenCc)) {
            this.assigned = match.routing;
        }
        else return;
    }

    private _getRules(): CaseRoutingRule[] {
        const cache = NCache.getCache({
            name: "tc_case_territory_rules",
            scope: NCache.Scope.PRIVATE
        });

        const cached = cache.get({ key: "active_rules" });
        if (cached) {
            const parsed = JSON.parse(cached) as CaseRoutingRule[];
            NLog.debug("_getRules", `Loaded ${parsed.length} rules from cache.`);
            return parsed;
        }

        const result = NQuery.runSuiteQL({
            query: `
            SELECT 
                custrecord_tc_routing_email AS routing_email,
                custrecord_tc_route_case_assignment AS routing,
                custrecord_cc_target_email_route AS allow_routing_cc
            
            FROM customrecord_tc_case_territories
            WHERE isinactive = 'F'
            `
        }).asMappedResults<{ routing_email: string, routing: number, allow_routing_cc: string }>();

        if (result.length <= 0) {
            return [];
        }

        const rules: CaseRoutingRule[] = result.map(rule => ({
            targetEmail: rule.routing_email.toLowerCase().trim(),
            routing: rule.routing,
            allowWhenCc: rule.allow_routing_cc === "T" ? true : false
        }));

        cache.put({
            key: "active_rules",
            value: JSON.stringify(rules),
            ttl: 600
        });

        NLog.debug("Loaded Territory Rules", rules);
        return rules;
    }

    private _getFirstMessage(): MessageType | undefined {
        const messageResult = NQuery.runSuiteQL({
            query: `
                SELECT to, cc
                FROM Message
                WHERE activity = ${this.id}
                AND dateTime = (SELECT MIN(dateTime) FROM Message WHERE activity = ${this.id})
                `
        }).asMappedResults<MessageType>();

        NLog.debug("Message Result", messageResult);

        if (!messageResult || messageResult.length === 0) {
            return;
        };

        return messageResult[0];
    }


    private _evaluateMatch(rules: CaseRoutingRule[], message: MessageType): RoutingDecision | undefined {
        const toEmails = this._normalizeEmails(message.to);
        const ccEmails = this._normalizeEmails(message.cc);

        if (toEmails.length <= 0) {
            return;
        }

        for (const email of toEmails) {
            const matchTo = rules.find(r => r.targetEmail === email);
            if (matchTo) {
                return {
                    routing: matchTo.routing,
                    allowWhenCc: matchTo.allowWhenCc,
                    matchedField: "TO"
                };
            }
        }

        if (ccEmails.length <= 0) {
            return;
        }
        
        for (const email of ccEmails) {
            const matchCc = rules.find(r => r.targetEmail === email);
            if (matchCc) {
                return {
                    routing: matchCc.routing,
                    allowWhenCc: matchCc.allowWhenCc,
                    matchedField: "CC"
                };
            }
        }
        
        return;
    }

    private _normalizeEmails(field: string | undefined): string[] {
        if (!field) {
            return [];
        }

        return field
            .split(/[;,]/)
            .map(e => e.trim().toLowerCase());
    }

}

interface CaseRoutingRule {
    targetEmail: string,
    routing: number,
    allowWhenCc: boolean
}

interface RoutingDecision {
    routing: number,
    allowWhenCc: boolean,
    matchedField: "TO" | "CC";
}

interface MessageType {
    to: string
    cc?: string
}
