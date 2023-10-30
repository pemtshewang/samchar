import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import * as nodemailer from "nodemailer";
import { db } from "./db";

const adapter = PrismaAdapter(db) as any;

export const authOptions: NextAuthOptions = {
  adapter,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    EmailProvider({
      type: "email",
      server: {
        service: "gmail",
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async (params) => {
        const { identifier, url, provider } = params
        const { host } = new URL(url)
        const user = await db.user.findUnique({
          where: {
            email: params.identifier,
          },
          select: {
            emailVerified: true,
          },
        })
        const emailVerified = user?.emailVerified;
        // NOTE: You are not required to use `nodemailer`, use whatever you want.
        const transport = nodemailer.createTransport(provider.server)
        //css file
        const subBodyHtml = emailVerified ?
          `You requested to sign in to your account.<br />
        Use the button below to sign in:`:
          `Verify your email address<br />
        Use the button below to verify your email address:`;

        const buttonName = emailVerified ? "Sign in" : "Verify email address";
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: emailVerified ? "Sign in link to Samchar" : "Verify your email address",
          text: text({ url, host }),
          html: html({ url, host }),
        })

        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
        }

        function html(params: { url: string; host: string }) {
          const { url } = params

          //get the button color of shadcn theme
          const brandColor = "#000"
          const color = {
            background: "#f9f9f9",
            text: "#444",
            heading: "#444",
            mainBackground: "#fff",
            // get the  button color of shadcn theme
            buttonBackground: brandColor,
            buttonBorder: brandColor,
            buttonText: "#fff",
          }

          return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; font-weight: 800; color: ${color.text};">
        Sign in to <img src="https://i.imgur.com/FkXiynP.png" width="100" height="100" style="margin-bottom: -10px;" />
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        ${subBodyHtml}
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">${buttonName}</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        The Link is only  valid for 24 hours.
      </td>
    </tr>
<tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
</tr>
  </table>
</body>
`
        }

        /** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
        function text({ url, host }: { url: string; host: string }) {
          return `Sign in to ${host}\n${url}\n\n`
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
  },
};
