import { IDKitWidget } from '@worldcoin/idkit'

function Test() {

  const onSuccess = () => {

  }

  const handleVerify = () => {
    
  }
  
  return (
    <div>
      <IDKitWidget
        app_id="wid_staging_f606f23f9714d8677a654bf610d42587" // obtained from the Developer Portal
        action="vote_1" // this is your action name from the Developer Portal
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