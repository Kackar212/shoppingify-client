import { useEffect, useState } from "react";
import { Modal } from "../src/components/modal/modal.component";
import { useRedirect } from "../src/hooks/useRedirect";

export default function AccountActivated() {
  const [isOpen, setIsOpen] = useState(true);
  const redirect = useRedirect();

  const close = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    setTimeout(() => {
      close();

      redirect('/auth/login');
    }, 5000);
  }, [])

  return <Modal isOpen={isOpen} close={close}>
    <p>Your account has been activated! click <a href="/auth/login">here</a> or wait for 5 second to be redirected to login page!</p>
  </Modal>;
}
