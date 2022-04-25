export type RuleOptions = Partial<{
	onlyDirectories: boolean;
	onlyFiles: boolean;
	dot: boolean;
	caseSensitiveMatch: boolean;
}>;

export type RuleEnforcement = 1 | 2 | 'warn' | 'error';

export type RuleValue =
	| RuleEnforcement
	| [RuleEnforcement]
	| [RuleEnforcement, string]
	| [RuleEnforcement, RuleOptions]
	| [RuleEnforcement, string, RuleOptions];

export type AliasValue = string | [string, string];

export type Config = Partial<{
	extends?: string;
	rules: Record<string, RuleValue>;
	aliases: Record<string, AliasValue>;
	ignorePath: string;
	ignore: boolean;
	ignorePatterns: string[];
	quiet: boolean;
	maxWarnings: number;
	bail: number;
	outputFile: string;
}>;
