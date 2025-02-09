import React from "react";
import { ComplaintForm } from "../components/ComplaintForm";
import axios from "axios";

const CustomerComplaint = () => {
  const onSubmit = async (data) => {
    try{
      const res = await axios.post(url, {
        data
      });

      if(!res.ok) {
        console.error("Error");
      }

      console.log("Success");

    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div>
      <ComplaintForm department="customer" onSubmit={onSubmit} />
    </div>
  );
};

export default CustomerComplaint;
