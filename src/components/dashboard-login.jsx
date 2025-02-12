import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function DashboardLoginForm({ className, ...props }) {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [error, setError] = useState(null);
  // let navigate = useNavigate();
    
  
  let login = async (e) => {
    try {
      e.preventDefault();
      setError(null);
  
      let data = {
        email,
        password
      }
  
    // let res = await axios.post('/api/users/login', data, {
    //     withCredentials : true
    // });
    // if(res.status === 200) {
    //     navigate('/');
    // } ;
    } catch(e) {
      setError(e.response.data.error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={login}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input value={email}
                onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

