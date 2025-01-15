"use server";

import { revalidatePath } from "next/cache";
import { Teacher, Subject } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

type CurrentState = { saccess: string, error: string }//1 variant

export const createTeacher = async (
  { saccess, error }: CurrentState, formData: any) => {
  const { username, password, lastname, phone, subject, img } =
    Object.fromEntries(formData);
  try {
    // const user= await clerkClient.users.createUser({username,password,role: })
    const newTeacher = new Teacher({
      username,
      password,
      lastname,
      phone,
      img: img ? img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/433px-Macaca_nigra_self-portrait_large.jpg',
      isActive: true,
      subject,
      address: 'Vinnitsa',
    });

    await newTeacher.save();
    //revalidatePath("/list/teachers");
    return { saccess: 'Saccess', error: '' }//1 variant
  } catch (err: any) {
    console.log(err.message);
    //throw new Error("Failed to create user!");//2 variant 
    return { saccess: '', error: err.message }//1 variant
  }
};

export const deleteTeacher = async (id: string | undefined) => {

  try {
    //await clerkClient.users.deleteUser(id)
    await Teacher.findByIdAndDelete(id);

  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }
  revalidatePath("/list/teachers");
};

export const updateTeacher = async ({ saccess, error }: CurrentState, formData: any) => {
  const { id, username, password, lastname, phone, subject, img } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields: { [key: string]: any } = {
      username,
      password,
      lastname,
      phone,
      img: img ? img : 'https://res.cloudinary.com/dvmakcpad/image/upload/v1729532054/kzykl1oneyuhwpywlnuw.png',
      isActive: true,
      subject,
      address: 'Vinnitsa',
    };

    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Teacher.findByIdAndUpdate(id, updateFields);
    return { saccess: 'Saccess', error: '' }
  } catch (err: any) {
    console.log(err);
    //throw new Error("Failed to update user!");
    return { saccess: '', error: err.message }
  }
  revalidatePath("/dashboard/list/teacers");
  // redirect("/dashboard/users");
};

//deleteStudent------------------------------------------------
export const deleteStudent = async (id: string | undefined) => {

  try {
    await Teacher.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }
  revalidatePath("/list/teachers");
};

// SUBJECT-----------------------------------------------------
export const createSubject = async ({ saccess, error }: CurrentState, formData: any) => {
  const { subject, teacher } = Object.fromEntries(formData);
  try {
    connectToDB();
    const newSubject = new Subject({
      subject,
      teacher,
      img: ''
    });
    await newSubject.save();
    return { saccess: 'Saccess', error: '' }
  } catch (err: any) {
    return { saccess: '', error: err.message }
  }
};
export const deleteSubject = async (id: string | undefined) => {

  try {
    //await clerkClient.users.deleteUser(id)
    await Subject.findByIdAndDelete(id);
    console.log('deletesub', id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }
  revalidatePath("/list/teachers");
};