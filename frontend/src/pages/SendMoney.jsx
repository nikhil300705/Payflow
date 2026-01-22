import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { BACKEND_URL } from "../config";
import PinModal from "../components/PinModal";
import "../App.css";

export default function SendMoney() {
  const navigate = useNavigate();
  const location = useLocation();

  // getting user details passed from dashboard
  const { id, name } = location.state || {};

  const [amount, setAmount] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!id) {
    return <h3>User not selected</h3>;
  }

  async function handleTransfer(pin) {
    try {
      setLoading(true);
      setError("");

      await axios.post(
        `${BACKEND_URL}/account/transfer`,
        {
          to: id,
          amount: Number(amount),
          pin: pin
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      alert("✅ Money transferred successfully");
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Transaction failed. Please try again."
      );
    } finally {
      setLoading(false);
      setShowPinModal(false);
    }
  }

  return (
    <div className="send-container">
      <div className="send-card">
        <h2>Send Money</h2>

        <p className="send-to">
          To <strong>{name}</strong>
        </p>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button
          disabled={!amount || loading}
          onClick={() => setShowPinModal(true)}
        >
          {loading ? "Processing..." : "Send Money"}
        </button>
      </div>

      {/* PIN MODAL */}
      {showPinModal && (
        <PinModal
          onClose={() => setShowPinModal(false)}
          onConfirm={(pin) => {
            handleTransfer(pin);
            return true;
          }}
        />
      )}
    </div>
  );
}
