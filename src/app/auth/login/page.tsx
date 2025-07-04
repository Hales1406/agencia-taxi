import SigninForm from "@/components/auth/SigninForm";
import { Card, Container, Flex, Heading, Text, Link } from "@radix-ui/themes";
import NavLink from "next/link";

function LoginPage() {
    return (
        <>
            <Container size="1" height="100%" className="p-3 md:p-0">
                <Flex
                    className="h-screen w-full items-center"
                >
                    <Card className="w-full p-7">
                        <Heading mb="2">Inicia Sesión</Heading>
                        <SigninForm />

                        <Flex justify="between" my="4">
                            <Text>
                                ¿No tienes cuenta?
                            </Text>
                            <Link asChild>
                                <NavLink href="/auth/register" passHref>Regístrate</NavLink>
                            </Link>
                        </Flex>
                    </Card>
                </Flex>
            </Container>
        </>
    )
}

export default LoginPage