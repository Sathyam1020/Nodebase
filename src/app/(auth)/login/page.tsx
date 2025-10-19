import LoginForm from '@/features/auth/components/login-form';
import { requireUnauth } from '@/lib/auth-utils';
import Image from 'next/image';
import Link from 'next/link';

const page = async () => {
    await requireUnauth();
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default page;  