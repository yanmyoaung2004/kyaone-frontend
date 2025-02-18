import { Complaints } from "../../components/Sales/Complaint";

export default function ComplaintsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-black font-bold mb-5">
        Customer Complaints
      </h1>
      <Complaints />
    </div>
  );
}
