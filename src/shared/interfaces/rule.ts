interface IRuleOptions {
	readonly onlyDirectories?: boolean;
	readonly onlyFiles?: boolean;
}

export type IRuleEnforcement = 1 | 2;

export type IRuleValue =
	| IRuleEnforcement
	| [IRuleEnforcement]
	| [IRuleEnforcement, string]
	| [IRuleEnforcement, IRuleOptions]
	| [IRuleEnforcement, string, IRuleOptions];
