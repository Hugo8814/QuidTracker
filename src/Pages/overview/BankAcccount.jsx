import BankLogo from "../../utils/components/Accounts/BankLogo.jsx";

function BankAcccount({ bankImg, amount, accountType, bankName, providerId }) {
  // const [imageError, setImageError] = useState(false);}) {
  return (
    <>
      <BankLogo providerId={providerId} displayName={bankName} />
      <p className="text-[2.3rem] text-[#0055ff] font-semibold ">£{amount}</p>
      <p className="text-[1.2rem] text-[#0055ff] font-semibold ">{bankName}</p>
      <p className="text-[1rem] text-[#0055ff] font-semibold ">{accountType}</p>
    </>
  );
}

export default BankAcccount;
