export interface QrCodeErrorProps {
	error: Error | null;
}

const QrCodeError = ({ error }: QrCodeErrorProps) => {
	return (
		<div className="flex flex-col items-center">
			<div>Error!</div>
			<div className="text-xs text-muted-foreground">
				Unable to load QR Code due to: {error?.message}
			</div>
		</div>
	);
};

export default QrCodeError;
