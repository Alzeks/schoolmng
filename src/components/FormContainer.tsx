import { subjectsData, teachersData } from "@/lib/data";
import { Subject, Teacher } from "@/lib/models";
import FormModal from "./FormModal";
import { fetchSubjects } from "@/lib/fetchDaata";

type FormModalType = {
    table: 'teacher' | 'student' | 'subject',
    type: 'create' | 'update' | 'delete',
    //data?: string[] | undefined,
    id?: string | undefined
}

const ModalContainer = async ({ table, type, id }: FormModalType) => {

    let relatedData = [];
    if (type !== 'delete') {
        switch (table) {
            case 'subject':
                const teachers = await Teacher.find({}, { username: 1, _id: 0 })
                teachers ? relatedData = teachers : teachersData
                break;
            case 'teacher':
                const subjects = ''//await Subject.find({}, { subject: 1, _id: 0 })
                subjects ? relatedData = subjects : relatedData = subjectsData
                break;
            default:
                break;
        }
    }

    return (<>
        <FormModal table={table} type={type} id={id} relatedData={relatedData} />
    </>
    )
}

export default ModalContainer;