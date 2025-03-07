"use client"
import { useEffect, useState} from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import Dropdown from '@/components/ui/dropdown';
import Cookies from 'js-cookie';
export default function Profile() {
    const [editProfile,setEditProfile] = useState(false);
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[phonenumber,setPhonenumber]=useState("");
    const[bloodgroup,setBloodgroup]=useState("");
    const [error,setError]=useState("");
    const [sucess,setSucess]=useState("");
    const [city,setCity]=useState("");
    const fetchDetails = async () =>{
        const id = Cookies.get("userId");
        try{
            const res= await fetch(`/api/updates?id=${id}`);
            const data = await res.json();
            console.log(data)
            setName(data.row[0].name);
            setBloodgroup(data.row[0].bloodgroup);
            setEmail(data.row[0].email);
            setPhonenumber(data.row[0].phonenumber);
            setCity(data.row[0].city)
        }catch(e){
            console.log(e);
        }
    }
    const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

    const updateProfile = async ()=>{
        try{
            setLoading(true);
            const id = Cookies.get("userId");
            const res = await fetch("/api/updates",{
                method: "POST",
                headers: {content:"application/json"},
                body: JSON.stringify({name, email, phonenumber, bloodgroup, id})
            })
            if (res.ok) {
                setSucess("Profile updated successfully ✅");
            
                setTimeout(() => {
                    setSucess("");
                }, 3000);
            }else{
                setError("Profile updated failed")
            }
            
        }catch(e){
            console.log(e);

        }finally{
            setLoading(false);
            setEditProfile(false);
        }
    }
    useEffect(()=>{
        fetchDetails();
    },[])
    return (

        <div>
             
            <section className='p-14 md:p-60 flex md:flex-row flex-col justify-center items-center w-screen h-screen overflow-hidden'>
               
                <div className='flex flex-col gap-4 justify-center items-start'>
                    <Image
                        src="/default.jpg"
                        width={200}
                        height={200}
                        alt="Picture of the author"
                        className='rounded-xl'
                    />
                    <h3 className='text-green-200 text-center font-medium text-xl md:text-3xl'>{name}</h3>
                    <div className='flex flex-row[0] gap-1'><MapPin color='#ffffff' />
                    <h3 className='text-green-200 text-center font-mono text-sm md:text-lg'>{city}</h3>
                    </div>
                </div>
                <div className='p-6 flex flex-col gap-4 w-96 text-white ml-24'>
                {sucess && (
                    <div className='bg-green-600/20 border border-black p-4 md:w-96 rounded-md '>{sucess} </div>
                )}
                 {error && (
                    <div className='bg-red-600/20 border border-black p-4 md:w-96 rounded-md '>{sucess} </div>
                )}
                    <div className='flex flex-col gap-1'>
                    <label className='md:text-xl font-semibold text-xl'>Full Name</label>
                    <Input
                        placeholder='Full name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='bg-gray-700/40 w-72 md:w-96 text-white border-none '
                        disabled={!editProfile}
                    />
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label className='md:text-xl font-semibold text-xl'>Email</label>
                    <Input
                        placeholder='Email'
                        value={email}
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-gray-700/40 w-72  md:w-96 text-white border-none '
                        disabled={!editProfile}
                    />
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label className='md:text-xl font-semibold text-xl'>Phone</label>
                    <Input
                        placeholder='Phone number'
                        value={phonenumber}
                        type='text'
                        onChange={(e) => setPhonenumber(e.target.value)}
                        className='bg-gray-700/40 w-72  md:w-96 text-white border-none '
                        disabled={!editProfile}
                    />
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label className='md:text-xl font-semibold text-xl'>Blood Group</label>
                     { editProfile ? (
                        <Dropdown
                        label=""
                        options={bloodGroups}
                        value={bloodgroup}
                        onChange={setBloodgroup}
                        placeholder="Select a blood grooup"
                        name="Blood group"
                      />
                     ):(
                        <Input
                        placeholder='blood group'
                        value={bloodgroup}
                        onChange={(e) => setBloodgroup(e.target.value)}
                        className='bg-gray-700/40 w-72  md:w-96 text-white border-none '
                        disabled={!editProfile}
                    />
                     )
                     }
                    </div>
                   { editProfile ? 
                   (
                    <Button type='submit' className='w-32 bg-green-600/40 hover:bg-green-600/20' disabled={loading} onClick={updateProfile}>
                     {loading ? <>Upading....</>: <>Update Profile</>}
                </Button>
                   ):
                    (
                    <Button type='submit' className='w-32 bg-green-600/40 hover:bg-green-600/20' onClick={()=>setEditProfile(true)}>
                    Edit Profile
                </Button>
            )}
                </div>
            </section>

        </div>
    )
}

