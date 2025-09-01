import React from 'react';
import Modal from './modal';
import useStoreModal from '@/stores/store-model';

const DialogComponent = () => {
    const { modals, closeModal } = useStoreModal();

    return (
        <>
            {modals.map((modal, index) => (
                <Modal
                    key={index}
                    title={modal.title}
                    description={modal.description}
                    isOpen={modal.isOpen ?? true}
                    onClose={closeModal}
                    onInteractOutside={modal.onInteractOutside ?? true}
                    size={modal.size ?? "md"}
                    showCloseButton={modal.showCloseButton}
                >
                    {modal.content}
                </Modal>
            ))}
        </>
    );
};

export default DialogComponent;