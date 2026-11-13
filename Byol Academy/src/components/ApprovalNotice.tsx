export function ApprovalNotice({ approved }: { approved: boolean }) {
  if (approved || process.env.NODE_ENV === "production") return null;

  return <span className="approval-notice">Needs approval</span>;
}
