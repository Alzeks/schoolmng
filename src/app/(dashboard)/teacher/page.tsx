
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import FormContainer from '@/components/FormContainer'
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import { fetchTeachers } from "@/lib/fetchDaata";
import { UserT, } from "@/lib/types";
import { currentUser, User } from "@clerk/nextjs/server";
import Link from "next/link";
import ModalContainer from "@/components/FormContainer";
import BigCalendar from "@/components/BigCalendar";

const TeachersListPage = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {

  const q: string = searchParams?.search || ''
  const page: number = parseInt(searchParams?.page) || 1; //+parsInteger

  const user = await currentUser()
  const role: any = user?.publicMetadata

  const renderRow = (item: UserT) => (
    <tr key={item.id}
      className="border-b even:bg-slate-50 text-sm hover:bg-purple-100">
      <td className="flex items-center justify-center gap-4 p-4">
        <Link href={`/list/teachers/${item.id}`}>
          <Image src={item.img ? item.img : '/avatar.png'} width={40} height={40} alt=""
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
        </Link>

        <div className="flex flex-col">
          <h3 className="font-semibold">{item.username}</h3>
          <p className="text-xs text-gray-500">{item.lastname} {/* {item?.email} */}
          </p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.subject} {/* {item.subjects.join(',')} */}
      </td>
      <td className="hidden md:table-cell">class {/* {item.classes.join(',')} */}
      </td>
      <td className="hidden md:table-cell">{item?.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">

          {role == 'admin' && (<FormModal table="teacher" type="update" id={item.id} />)}
          {role == 'admin' && (<FormModal table="teacher" type="delete" id={item.id} />)}

        </div>
      </td>
    </tr>
  )

  return (
    <div>
      <div className="text-xl text-yellow-600">Teachers</div>
      <div className="bg-slate-50 "><BigCalendar /></div>
    </div>
  )
}

export default TeachersListPage;

