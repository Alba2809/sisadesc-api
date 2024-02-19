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
  deleteParent,
  getSubjectStudents
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
  parentSchema,
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
  "/registeruser",
  authRequired,
  validateRol("admin"),
  validateSchema(createUserSchema),
  registerUser
);
router.post(
  "/registerteacher",
  authRequired,
  validateRol("admin"),
  validateSchema(teacherSchema),
  registerTeacher
);
router.post(
  "/registerstudent",
  authRequired,
  validateRol("admin"),
  validateSchema(studentSchema),
  registerStudent
);
/* router.post(
  "/registerparent",
  authRequired,
  validateRol("admin"),
  validateSchema(fatherSchema),
  registerParent
); */
router.post(
  "/registerfather",
  authRequired,
  validateRol("admin"),
  validateSchema(fatherSchema),
  registerParent
);
router.post(
  "/registermother",
  authRequired,
  validateRol("admin"),
  validateSchema(motherSchema),
  registerParent
);
router.post(
  "/registertutor",
  authRequired,
  validateRol("admin"),
  validateSchema(tutorSchema),
  registerParent
);
router.post(
  "/registersubject",
  authRequired,
  validateRol("admin"),
  validateSchema(subjectSchema),
  registerSubject
);
router.put(
  "/updateuser/:id",
  authRequired,
  validateRol("admin"),
  upload.single("imageperfile"),
  validateSchema(updateUserSchema),
  updateUser
);
router.put(
  "/updateteacher/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(teacherSchema),
  updateTeacher
);
router.put(
  "/updatestudent/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(studentSchema),
  updateStudent
);
router.put(
  "/updateparent/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(parentSchema),
  updateParent
);
router.put(
  "/updatesubject/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(subjectSchema),
  updateSubject
);
router.get(
  "/getuser/:id",
  authRequired,
  validateRol("admin"),
  getUser
);
router.get(
  "/getusers",
  authRequired,
  validateRol("admin"),
  getUsers
);
router.get(
  "/getteacher/:id",
  authRequired,
  validateRol("admin"),
  getTeacher
);
router.get(
  "/getteachers",
  authRequired,
  validateRol("admin"),
  getTeachers
);
router.get(
  "/getstudent/:id",
  authRequired,
  validateRol("admin"),
  getStudent
);
router.get(
  "/getstudents",
  authRequired,
  validateRol("admin"),
  getStudents
);
router.get(
  "/getparent/:id",
  authRequired,
  validateRol("admin"),
  getParent
);
router.get(
  "/getparents",
  authRequired,
  validateRol("admin"),
  getParents
);
router.get(
  "/getsubject/:id",
  authRequired,
  validateRol("admin"),
  getSubject
);
router.get(
  "/getsubjects",
  authRequired,
  validateRol("admin"),
  getSubjects
);
router.get(
  "/getsubjectstudents/:id",
  authRequired,
  validateRol("admin"),
  getSubjectStudents
);
router.get(
  "/getroles",
  authRequired,
  validateRol("admin"),
  getRoles
);
router.get(
  "/getaddresses",
  authRequired,
  validateRol("admin"),
  getAddresses
);
router.delete(
  "/deleteuser/:id",
  authRequired,
  validateRol("admin"),
  deleteUser
);
router.delete(
  "/deleteteacher/:id",
  authRequired,
  validateRol("admin"),
  deleteTeacher
);
router.delete(
  "/deletestudent/:id",
  authRequired,
  validateRol("admin"),
  deleteStudent
);
router.delete(
  "/deleteparent/:id",
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
