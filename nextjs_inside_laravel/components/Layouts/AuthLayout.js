import { useAuth } from '@/hooks/auth'
import AppLayout from '@/components/Layouts/AppLayout';
import GuestLayout from '@/components/Layouts/GuestLayout';

const AuthLayout = ({ header=null, children }) => {
    return (<AppLayout>{children}</AppLayout>);
}

export default AuthLayout