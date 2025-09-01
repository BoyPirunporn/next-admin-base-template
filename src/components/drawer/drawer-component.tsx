import useStoreDrawer from '@/stores/store-drawer';
import { DrawerDemo } from './drawer-demo';

const DrawerComponent = () => {
    const { drawers, closeDrawer } = useStoreDrawer();

    return drawers.map((drawer, index) => (
        <DrawerDemo
            key={index}
            title={drawer.title}
            description={drawer.description}
            isOpen={drawer.isOpen ?? true} // 👈 ใช้ isOpen ตรงนี้
            onClose={closeDrawer}
            onInteractOutside={drawer.onInteractOutside ?? true}
            size={drawer.size ?? "md"}
            showCloseButton={drawer.showCloseButton}
        >
            {drawer.content}
        </DrawerDemo>
    ));
};

export default DrawerComponent;