import React, { useEffect } from "react";

function EsewaVerificationScreen() {
  useEffect(() => {
    // Automatically submit the form after a delay
    const timer = setTimeout(() => {
      document.getElementById('esewa_form').submit();
    }, 2000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-5">
      <div className="flex justify-center m-5">
        <button type="button" className="text-black px-3 py-2" disabled>
          <i className="fad fa-spinner animate-spin me-2"></i>
          Processing To eSewa...
        </button>
        <form 
          id="esewa_form" 
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" 
          method="POST"
        >
          <input 
            type="hidden" 
            id="amount" 
            name="amount" 
            value="1000" 
            required 
          />
          <input 
            type="hidden" 
            id="tax_amount" 
            name="tax_amount" 
            value="0" 
            required 
          />
          <input 
            type="hidden" 
            id="total_amount" 
            name="total_amount" 
            value="1000" 
            required 
          />
          <input 
            type="hidden" 
            id="transaction_uuid" 
            name="transaction_uuid" 
            value="unique-transaction-id" 
            required 
          />
          <input 
            type="hidden" 
            id="product_code" 
            name="product_code" 
            value="EPAYTEST" 
            required 
          />
          <input 
            type="hidden" 
            id="product_service_charge" 
            name="product_service_charge" 
            value="0" 
            required 
          />
          <input 
            type="hidden" 
            id="product_delivery_charge" 
            name="product_delivery_charge" 
            value="0" 
            required 
          />
          <input 
            type="hidden" 
            id="success_url" 
            name="success_url" 
            value="http://localhost:3000/paymentSuccess" 
            required 
          />
          <input 
            type="hidden" 
            id="failure_url" 
            name="failure_url" 
            value="http://localhost:3000/paymentFailed" 
            required 
          />
          <input 
            type="hidden" 
            id="signed_field_names" 
            name="signed_field_names" 
            value="total_amount,transaction_uuid,product_code" 
            required 
          />
          <input 
            type="hidden" 
            id="signature" 
            name="signature" 
            value="generated-signature-value" 
            required 
          />
        </form>
      </div>
    </div>
  );
}

export default EsewaVerificationScreen;
