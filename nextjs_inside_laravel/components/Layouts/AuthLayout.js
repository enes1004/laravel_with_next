import { useAuth } from '@/hooks/auth'
import AppLayout from '@/components/Layouts/AppLayout';
import GuestLayout from '@/components/Layouts/GuestLayout';

const AuthLayout = ({ header=null, children }) => {
    const { user } = useAuth({ middleware: false })
    const Layout = user?AppLayout:GuestLayout;
    return (<Layout>{children}</Layout>);
}

export default AuthLayout