import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider} from "@nextui-org/react";
import { PiSealCheckBold, PiWarningBold, PiWarningOctagonBold } from "react-icons/pi";


interface AlertProps{
  content:string[];
  isOpen: any;
  onOpenChange: any;
  
}
export default function Alert({content, isOpen, onOpenChange}:AlertProps) {

  let icon = <PiWarningBold size={30}/>
  let color = "warning"
  if (content[0]=="error"){
    color = "danger"
    icon = <PiWarningOctagonBold size={30}/>
  }else if((content[0]=="success")){
    color = "success"
    icon = <PiSealCheckBold size={30}/>
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="sm" size="sm" backdrop="blur" placement="center">
        <ModalContent>
            <>
              <ModalHeader className={`flex gap-1 font-bold text-md p-3 text-${color}`}>{content[1]}</ModalHeader>
              <Divider/>
              <ModalBody className="text-sm p-3 pb-6 gap-2">

                <div className="grid grid-cols-6 gap-1">
                  <div className="col-span-1 flex items-center ">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${color}`}>
                      {icon}
                    </div>
                  </div>
                  <div className="col-span-5 flex items-center ">
                    <p className="">{content[2]}</p>
                  </div>
                </div>
              </ModalBody>
            </>
        </ModalContent>
      </Modal>
    </>
  );
}
