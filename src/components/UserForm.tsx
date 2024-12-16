import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../types/userTypes";
import "../styles/UserForm.scss";

interface UserFormProps {
  onSubmit: (data: User) => void;
  initialData?: User;
  users: User[];
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialData,
  users,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    defaultValues: initialData,
  });

  const [duplicateError, setDuplicateError] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmitHandler = (data: User) => {
    const isDuplicate = users.some(
      (user) => user.name === data.name || user.email === data.email
    );

    if (isDuplicate) {
      setDuplicateError("This name or email already exists.");
      return;
    } else {
      setDuplicateError("");
      onSubmit(data);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label>Name</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register("email", { required: "Email is required" })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Role</label>
        <select {...register("role", { required: "Role is required" })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}
      </div>
      {duplicateError && <p style={{ color: "red" }}>{duplicateError}</p>}
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
