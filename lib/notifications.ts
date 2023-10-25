import { NotificationType } from "@/types";

export function makeNotification({ title, type }: { title: string, type: string }): NotificationType {
  if (type === "resolved") {
    return {
      message: `Your grievance <b><i>${title}</i></b> has been resolved. The decision has been taken by the management as an agenda. Incase if you don't see any improvements in the grievances  that has been resolved, you are permit to repost the grievance. We will take the decision accordingly if it is approved for genuine reason`,
    }
  } else if (type === "rejected") {
    return {
      message: `Your grievance <b><i>${title}</i></b> has been rejected. Please contact admin for further details if you have any enquiry. Please note that you have followed the norms of CST grievance system while posting the grievance.`,
    }
  } else if (type === "pending") {
    return {
      message: `Your new grievance <b><i>${title}</i></b> has been posted. Please wait for the management to take action and update the status on your grievance.`,
    }
  } else if (type === "filtered") {
    return {
      message: `Your grievance <b><i>${title}</i></b> has been filtered. Please contact admin for further details if you have any enquiry. Please note that you have followed the norms of CST grievance system while posting the grievance.`,
    }
  }
  return {
    message: `Your grievance  has been posted. Please wait for the management to take action.`,
  }
}
