"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";

const CaseStudyPage = ({ caseStudyId }) => {
  const [storedPassword, setStoredPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  useEffect(() => {
    if (!caseStudyId) return; // ⛔️ Guard clause

    const fetchPassword = async () => {
      try {
        const caseStudyDocRef = doc(db, "Case-Studies", caseStudyId);
        const caseStudyDoc = await getDoc(caseStudyDocRef);

        if (caseStudyDoc.exists()) {
          // Fetch the related password from AccessPasswords
          const accessPasswordRef = collection(db, "AccessPasswords");
          const passwordQuery = query(accessPasswordRef, where("caseStudyId", "==", caseStudyId));
          const querySnapshot = await getDocs(passwordQuery);

          if (!querySnapshot.empty) {
            const passwordDoc = querySnapshot.docs[0];
            setStoredPassword(passwordDoc.data().password);
          }
        }
      } catch (error) {
        console.error("Error fetching password:", error);
      }
    };

    fetchPassword();
  }, [caseStudyId]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const enteredPassword = e.target.password.value;

    if (enteredPassword === storedPassword) {
      setIsPasswordCorrect(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isPasswordCorrect) {
    return (
      <form onSubmit={handlePasswordSubmit}>
        <input type="password" name="password" placeholder="Enter password" required />
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <div>
      <h1>Case Study Details</h1>
      {/* Show the actual content once password is correct */}
    </div>
  );
};

export default CaseStudyPage;
