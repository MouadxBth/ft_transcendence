export interface SettingsHeaderProps {
	className?: string;
}

const SettingsHeader = ({ className }: SettingsHeaderProps) => {
	return (
		<div className="pl-2 pb-2 space-y-1 w-56">
			<h1 className="text-2xl font-semibold leading-none tracking-tight">Settings</h1>
			<p className="text-sm text-muted-foreground">Manage Your Account</p>
		</div>
	);
};

export default SettingsHeader;
