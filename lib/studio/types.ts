// Content Studio: the dashboard where Next Level Procurement approves blog posts from her phone.
// This file holds the shapes only. The prototype at /studio runs on sample data in the browser;
// the paid content engine would fill the same shapes from Supabase and Google Search Console.

export type Status =
  | "idea" // suggested from search data or by her; not written yet
  | "drafting" // being written (or rewritten after her notes)
  | "review" // waiting for her
  | "changes" // she asked for changes; a new version is on its way
  | "scheduled" // approved, goes live at a set time
  | "published" // live on the site
  | "declined"; // she said no; kept, can be restored

export type Block = { id: string; md: string; html: string };

export type Check = { id: string; label: string; detail: string; state: "ok" | "confirm" | "confirmed" };

export type SearchSignal = {
  query: string;
  impressions: number; // last 28 days
  clicks: number;
  position: number;
  note: string; // why this matters, in plain words
};

export type Comment = { id: string; blockId: string | null; text: string; at: string };

export type Post = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  service?: string;
  status: Status;
  version: number;
  editedBy?: "her" | "engine";
  blocks: Block[];
  checks: Check[];
  signal?: SearchSignal;
  comments: Comment[];
  changeNote?: string; // what she asked for
  whatChanged?: string[]; // what the new version changed
  createdAt: string;
  readyAt?: string; // when it reached her
  scheduledFor?: string;
  publishedAt?: string;
  declinedReason?: string;
  real?: boolean; // true for the three drafts that exist on her live blog
};

export type ActivityEvent = { id: string; at: string; who: "Dorcas" | "Content engine" | "MoCreative"; postId?: string; text: string };

export type QueryRow = { query: string; clicks: number; impressions: number; position: number; page?: string };

export type Settings = {
  notifyWhatsApp: boolean;
  notifyEmail: boolean;
  reminderAfterDays: number; // 0 = off
  weeklySummary: boolean;
  rhythm: "1-week" | "2-week" | "1-month";
  publishDay: string;
  publishTime: string;
  houseRules: string[];
  failNextPublish: boolean; // prototype control: shows the error state
};

export type StudioState = {
  posts: Post[];
  activity: ActivityEvent[];
  settings: Settings;
  signedIn: boolean;
};
