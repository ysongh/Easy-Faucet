import { IDKitWidget } from '@worldcoin/idkit'

function Test() {

  const onSuccess = async (proofdata) => {
    try {
      const res = await fetch('http://localhost:4000/verifyproof', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          merkle_root: proofdata.merkle_root,
          nullifier_hash: proofdata.nullifier_hash,
          proof: proofdata.proof,
          credential_type: proofdata.credential_type,
          action: "test"
        })
      })
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleVerify = () => {
    
  }
  
  return (
    <div>
      <IDKitWidget
        app_id="" // obtained from the Developer Portal
        action="test" // this is your action name from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // optional callback when the proof is received
        credential_types={['orb', 'phone']} // optional, defaults to ['orb']
        enableTelemetry // optional, defaults to false
      >
        {({ open }) => <button onClick={open}>Verify with World ID</button>}
      </IDKitWidget>
    </div>
  )
}

export default Test