import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';
import config from '@/config';
import '@/app/globals.css';
import colors from './colors';

interface PasswordResetEmailProps {
	email: string;
	url?: string;
}

export const PasswordResetEmail = ({ email, url }: PasswordResetEmailProps) => (
	<Html>
		<Head />
		<Preview>Verify your email for {config.appName}</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img
					src={`${process.env.BASE_URL}/static/logo.png`}
					width='42'
					height='42'
					alt='Linear'
					style={logo}
				/>
				<Heading style={heading}>Reset your password.</Heading>
				<Text style={paragraph}>Hi,</Text>
				<Text style={paragraph}>
					Someone recently requested a password change for your {config.appName}{' '}
					account. If this was you, click the button below to set a new
					password:
				</Text>

				<Section style={buttonContainer}>
					<Button
						style={button}
						href={url}
					>
						Reset password
					</Button>
				</Section>

				<Hr style={hr} />
				<Link
					href={process.env.BASE_URL}
					style={reportLink}
				>
					{config.appName}
				</Link>
				<Text style={noteText}>
					This email was intended for{' '}
					<a
						style={link}
						href={`mailto:${email}`}
					>
						{email}
					</a>
					. If you don&apos;t want to change your password or didn&apos;t
					request this, you can safely ignore and delete this message.
				</Text>
			</Container>
		</Body>
	</Html>
);

PasswordResetEmail.PreviewProps = {
	validationCode: '043783',
	name: 'Cole',
	email: 'cole@saaskit.design',
} as PasswordResetEmailProps;

export default PasswordResetEmail;

const logo = {
	borderRadius: 21,
	width: 42,
	height: 42,
};

const main = {
	backgroundColor: colors.background,
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
	maxWidth: '560px',
};

const heading = {
	fontSize: '30px',
	letterSpacing: '-0.5px',
	lineHeight: '1.3',
	fontWeight: '400',
	color: colors.highContrast,
};

const paragraph = {
	fontWeight: '400',
	margin: '0 0 14px',
	fontSize: '14px',
	lineHeight: '1.4',
	color: colors.lowContrast,
};

const noteText = {
	fontSize: '12px',
	fontWeight: '400',
	color: colors.lowContrast,
};

const buttonContainer = {
	padding: '8px 0 8px',
};

const button = {
	backgroundColor: colors.highContrast,
	color: colors.background,
	borderRadius: '6px',
	fontWeight: '500',
	fontSize: '15px',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	padding: '11px 23px',
};

const reportLink = {
	fontSize: '12px',
	color: colors.lowContrast,
	fontWeight: '400',
};

const hr = {
	borderColor: '#dfe1e4',
	margin: '42px 0 26px',
};

const link = {
	color: colors.highContrast,
};
