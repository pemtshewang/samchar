import * as z from "zod";

const NavItemSchema = z.object({
  title: z.string(),
  href: z.string(),
  disabled: z.boolean().optional(),
});

const DashboardNavItemSchema = z.object({
  title: z.string(),
  href: z.string()
})

type NavItem = z.infer<typeof NavItemSchema>;

export type DashboardNavItemType = z.infer<typeof DashboardNavItemSchema>;

export type MainNavItem = NavItem;

export type MainNavConfig = {
  mainNav: MainNavItem[]
}

export type AuthNavConfig = {
  authNav: NavItem[]
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

// type for frequently asked questions
const FAQItem = z.object({
  question: z.string(),
  answer: z.string()
});

export type FAQItemType = z.infer<typeof FAQItem>;

const UserSessionSchema = z.object({
  id: z.string(),
  email: z.string().email(),
})

export type UserSession = z.infer<typeof UserSessionSchema>;

// types for the card
interface GraphCardItemType {
  id: string,
  title: string,
  description: string,
}

export type GraphCardType = GraphCardItemType;

interface UserGrievanceType {
  header: string,
  type?: string,
  title: string,
  grievance: string,
  posted: string,
  upvotes: number,
  status: string,
  category: string,
}

interface GrievanceCategory {
  grievance: string,
  color: string,
}
export type GrievanceCategoryType = GrievanceCategory;


interface AnnouncementContent {
  title: string,
  date: string,
  content: string,
}

interface NotificationContent {
  title: string,
  date: string,
  content: string,
}

interface NotificationType {
  message: string,
}

interface ChartAttribute {
  name: string,
  value: string,
  fill: string,
}

interface ChartDisplayAttribute {
  header: string,
  data: ChartAttribute[],
  description: string
}

export type AnnouncementContentType = AnnouncementContent;

export type UserGrievance = UserGrievanceType;

export type NotificationContentType = NotificationContent;

export type NotificationType = NotificationType;

export type ChartAttributeType = ChartAttribute;

export type ChartDisplayAttributeType = ChartDisplayAttribute;
