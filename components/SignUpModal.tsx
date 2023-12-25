import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import close from "@/assets/close.svg";
import metamask from "@/public/metamask.png";
import wc from "@/assets/wc.svg";
import coinbase from "@/assets/coinbase.svg";
import fb from "@/assets/fb.svg";
import twitter2 from "@/assets/twitter2.svg";
import discord2 from "@/assets/discord2.svg";
import google from "@/assets/google.svg";
import twitch from "@/assets/twitch.svg";
import gh from "@/assets/gh.svg";
import Image from "next/image";
import SocialButton from "./SocialButton";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import ReactGA from "react-ga4";
import { useAppDispatch, useAppSelector } from "@/store/store";
import * as amplitude from "@amplitude/analytics-browser";
import { signDataMessage as message, walletType } from "@/lib/helpers";
import { selectOperatorSlice, setIsLoginError, setIsLoginModalOpen, setIsSignUpModalOpen, validateOperator } from "@/store/operatorSlice";
import WalletButton from "./WalletButton";
import { useRouter } from "next/navigation";

const SignUpModal = (): JSX.Element => {
  const [connectingWalletId, setConnectingWalletId] = useState<string>("");
  const { connect, connectors } = useConnect();
  const emailRef = useRef<HTMLInputElement>(null);
  const { isSignUpModalOpen, isLoginError, validateRedirectRoute } = useAppSelector(selectOperatorSlice);
  const dispatch = useAppDispatch();
  const { address, connector, isConnected } = useAccount();
  const router = useRouter();
  const { data: signature, isSuccess: isSignMessageSuccess, signMessage } = useSignMessage({
    message,
  })

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "sign-up-modal-bg") {
        dispatch(setIsSignUpModalOpen(false));
      }
    });
  }, []);

  useEffect(() => {
    if (address && connector) {
      amplitude.track("Wallet connected", {
        walletType: walletType[connector.id],
        walletAddress: address
      });
    }
  }, [isConnected])

  useEffect(() => {
    if (isConnected && isSignUpModalOpen) {
      dispatch(setIsSignUpModalOpen(false));
      signMessage();
    }
  }, [isConnected, isSignUpModalOpen])

  useEffect(() => {
    if (isSignMessageSuccess && address && signature) {
      dispatch(validateOperator({
        signData: { externallyOwnedAccountAddress: address, message, signature },
        route: "/dashboard?contact-details=true",
      }));
    }
  }, [isSignMessageSuccess])

  useEffect(() => {
    if(isLoginError) {
      dispatch(setIsLoginError(false));
      router.push(validateRedirectRoute);
    }
  }, [isLoginError])

  const connectionEvent = (id: string) => {
    ReactGA.event({
      category: "Connection",
      action: "Connecting wallet",
      label: id,
    });
  };

  const connectWallet = (id: string) => {
    connectionEvent(id);
    setConnectingWalletId(id);
    connect({ connector: connectors.find((connector) => connector.id === id) });
  }

  return (
    <AnimatePresence>
      {isSignUpModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex"
          id="sign-up-modal-bg"
        >
          <motion.div
            initial={{ opacity: 0, top: "0" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "0" }}
            transition={{
              duration: 0.3,
            }}
            className="bg-white min-h-[203px] w-[396px] max-w-[95%] z-50 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-lg p-5 flex flex-col"
          >
            <span className="flex w-full justify-between items-start">
              <p className="text-[20px] font-bold">Create new operator account</p>
              <Image
                src={close}
                alt="close"
                className="cursor-pointer w-6"
                onClick={() => dispatch(setIsSignUpModalOpen(false))}
              />
            </span>
            <div className="text-sm pt-2">
              <p className="text-heading-gray">
                A smart wallet account will be created for you on the Fuse Network.
              </p>
              <span className="flex gap-1 ">
                <p className="text-heading-gray">
                  Already have an account?
                </p>
                <div
                  className="font-extrabold underline cursor-pointer"
                  onClick={() => {
                    dispatch(setIsSignUpModalOpen(false));
                    dispatch(setIsLoginModalOpen(true));
                  }}
                >
                  Login
                </div>
              </span>
            </div>
            <div className="grid grid-cols-3 w-full gap-2 pt-4">
              <WalletButton
                icon={metamask}
                text="MetaMask"
                className="w-[35px]"
                id="injected"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("injected")}
              />
              <WalletButton
                icon={wc}
                text="WalletConnect"
                className="w-[35px]"
                id="walletConnect"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("walletConnect")}
              />
              <WalletButton
                icon={coinbase}
                text="Coinbase"
                className="h-[30px]"
                id="coinbaseWallet"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("coinbaseWallet")}
              />
            </div>
            <div className="flex pt-4 w-full justify-between text-[#9F9F9F] items-center text-[10px]">
              <hr className="w-[37%]" />
              <p>or connect with</p>
              <hr className="w-[37%]" />
            </div>
            <div className="grid grid-cols-3 w-full gap-2 pt-4">
              <SocialButton
                icon={google}
                className="bg-[#F3F3F3]"
                id="google"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("google")}
              />
              <SocialButton
                icon={fb}
                className="bg-[#C2D7F2]"
                id="facebook"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("facebook")}
              />
              <SocialButton
                icon={twitter2}
                className="bg-[#E5F5FF]"
                id="twitter"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("twitter")}
              />
              <SocialButton
                icon={discord2}
                className="bg-[#D8DAF0]"
                id="discord"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("discord")}
              />
              <SocialButton
                icon={twitch}
                className="bg-[#DBD8F0]"
                id="twitch"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("twitch")}
              />
              <SocialButton
                icon={gh}
                className="bg-[#F3F3F3]"
                id="github"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("github")}
              />
            </div>
            <div className="flex pt-4 w-full justify-between text-[#9F9F9F] items-center text-[10px]">
              <hr className="w-[40%]" />
              <p>or with email</p>
              <hr className="w-[40%]" />
            </div>
            <div className="flex w-full pt-3">
              <div className="flex bg-[#F2F2F2] p-2 rounded-md w-2/3">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="outline-none w-full bg-[#F2F2F2] text-xs p-1"
                  ref={emailRef}
                />
              </div>
              <button
                className="bg-black rounded-md w-1/3 text-xs font-medium ml-2 text-white"
                onClick={() => {
                  if (!emailRef.current || !emailRef.current.value.length) {
                    return
                  }
                  localStorage.setItem("Fuse-loginHint", emailRef.current.value);
                  connectWallet("email");
                }}
              >
                Connect
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default SignUpModal;
