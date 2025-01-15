import { UserT,  UserT2} from "@/lib/types"
type SubjectT = { id: number, subject: string }
const columns = [
  { header: 'Info', accessor: 'info' },
  { header: 'Teacher ID', accessor: 'teacherid', className: 'hidden md:table-cell' },
  { header: 'Sabjects', accessor: 'sabjects', className: 'hidden md:table-cell' },
  { header: 'Classes', accessor: 'classes', className: 'hidden md:table-cell' },
  { header: 'Fhone', accessor: 'phone', className: 'hidden lg:table-cell' },
  { header: 'Address', accessor: 'address', className: 'hidden md:table-cell' },
  { header: 'Actions', accessor: 'actions', },
]

const Table = ({ renderRow, data }:
  {
    renderRow: (item: UserT ) => React.ReactNode,
    data: SubjectT[] | UserT[]
  }
) => {


  return (
    <table className='w-full p-4 mt-6' >
      <thead>
        <tr className=' text-left text-gray-500 text-sm '>
          {columns.map(col =>
            <th key={col.header} className={col.className}>
              {col.header}
            </th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => renderRow(item))}
      </tbody>
    </table>
  )
}

export default Table;