import { IRuleEnforcement } from '@/interfaces/rule';

type IConfigurationRuleEnforcement = IRuleEnforcement | 'warn' | 'error';

export type IConfigurationRuleValue = IConfigurationRuleEnforcement | [IConfigurationRuleEnforcement, string];
