import { Router } from "express";
import {
  registerUser,
  registerTeacher,
  registerStudent,
  registerSubject,
  updateUser,
  updateTeacher,
  updateStudent,
  updateSubject,
  getUser,
  getUsers,
  getTeacher,
  getTeachers,
  getStudent,
  getStudents,
  getSubject,
  getSubjects,
  deleteUser,
  deleteTeacher,
  deleteStudent,
  deleteSubject,
  getRoles,
  getAddresses,
  registerParent,
  updateParent,
  getParent,
  getParents,
  deleteParent
} from "../controllers/admin.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
  studentSchema,
  teacherSchema,
  subjectSchema,
  fatherSchema,
  motherSchema,
  tutorSchema,
} from "../schemas/admin.schema.js";
import multer from "multer"
import { uploadImagePerfile } from "../config.js";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
/* const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
  destination: (req, file, cb) => {
    cb(null, "src/public/images");
  },
});

const upload = multer({
  dest: "src/public/images"
}); */

router.post(
  "/admin/registeruser",
  authRequired,
  validateRol("admin"),
  validateSchema(createUserSchema),
  registerUser
);
router.post(
  "/admin/registerteacher",
  authRequired,
  validateRol("admin"),
  validateSchema(teacherSchema),
  registerTeacher
);
router.post(
  "/admin/registerstudent",
  authRequired,
  validateRol("admin"),
  validateSchema(studentSchema),
  registerStudent
);
router.post(
  "/admin/registerfather",
  authRequired,
  validateRol("admin"),
  validateSchema(fatherSchema),
  registerParent
);
router.post(
  "/admin/registermother",
  authRequired,
  validateRol("admin"),
  validateSchema(motherSchema),
  registerParent
);
router.post(
  "/admin/registertutor",
  authRequired,
  validateRol("admin"),
  validateSchema(tutorSchema),
  registerParent
);
router.post(
  "/admin/registersubject",
  authRequired,
  validateRol("admin"),
  validateSchema(subjectSchema),
  registerSubject
);
router.put(
  "/admin/updateuser/:id",
  authRequired,
  validateRol("admin"),
  upload.single("imageperfile"),
  validateSchema(updateUserSchema),
  updateUser
);
router.put(
  "/admin/updateteacher/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(teacherSchema),
  updateTeacher
);
router.put(
  "/admin/updatestudent/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(studentSchema),
  updateStudent
);
router.put(
  "/admin/updatefather/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(fatherSchema),
  updateParent
);
router.put(
  "/admin/updatemother/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(motherSchema),
  updateParent
);
router.put(
  "/admin/updatetutor/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(tutorSchema),
  updateParent
);
router.put(
  "/admin/updatesubject/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(subjectSchema),
  updateSubject
);
router.get(
  "/admin/getuser/:id",
  authRequired,
  validateRol("admin"),
  getUser
);
router.get(
  "/admin/getusers",
  authRequired,
  validateRol("admin"),
  getUsers
);
router.get(
  "/admin/getteacher/:id",
  authRequired,
  validateRol("admin"),
  getTeacher
);
router.get(
  "/admin/getteachers",
  authRequired,
  validateRol("admin"),
  getTeachers
);
router.get(
  "/admin/getstudent/:id",
  authRequired,
  validateRol("admin"),
  getStudent
);
router.get(
  "/admin/getstudents",
  authRequired,
  validateRol("admin"),
  getStudents
);
router.get(
  "/admin/getparent/:id",
  authRequired,
  validateRol("admin"),
  getParent
);
router.get(
  "/admin/getparents",
  authRequired,
  validateRol("admin"),
  getParents
);
router.get(
  "/admin/getsubject/:id",
  authRequired,
  validateRol("admin"),
  getSubject
);
router.get(
  "/admin/getsubjects",
  authRequired,
  validateRol("admin"),
  getSubjects
);
router.get(
  "/admin/getroles",
  authRequired,
  validateRol("admin"),
  getRoles
);
router.get(
  "/admin/getaddresses",
  authRequired,
  validateRol("admin"),
  getAddresses
);
router.delete(
  "/admin/deleteuser/:id",
  authRequired,
  validateRol("admin"),
  deleteUser
);
router.delete(
  "/admin/deleteteacher/:id",
  authRequired,
  validateRol("admin"),
  deleteTeacher
);
router.delete(
  "/admin/deletestudent/:id",
  authRequired,
  validateRol("admin"),
  deleteStudent
);
router.delete(
  "/admin/deleteparent/:id",
  authRequired,
  validateRol("admin"),
  deleteParent
);
router.delete(
  "/admin/deletesubject/:id",
  authRequired,
  validateRol("admin"),
  deleteSubject
);

export default router;
