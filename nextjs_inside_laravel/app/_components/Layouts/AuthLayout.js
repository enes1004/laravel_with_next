import { useAuth } from '@/hooks/auth'
import AppLayout from '@/app/_components/Layouts/AppLayout';
import GuestLayout from '@/app/_components/Layouts/GuestLayout';

const AuthLayout = ({ header=null, children }) => {
    return (<AppLayout>{children}</AppLayout>);
}

export default AuthLayout