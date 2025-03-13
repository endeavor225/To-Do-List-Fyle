import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Image,
  addToast,
  DatePicker,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addData } from "../../api/entity";
import "./CreateModal.css";

const validationSchema = Yup.object({
  title: Yup.string()
    .max(50, "50 caractères maximum")
    .required("Veuillez renseigner ce champ."),
  description: Yup.string().max(100, "100 caractères maximum"),
  echeance_date: Yup.date().required("Veuillez renseigner ce champ."),
});

export default function CreateModal({ isOpen, onOpenChange, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const initialValues = {
    title: "",
    description: "",
    echeance_date: null,
  };

  useEffect(() => {
    if (isOpen) {
      setServerErrors({});
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (values, { setSubmitting }, onClose) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("echeance_date", values.echeance_date);
    try {
      let result = await addData("tasks", formData);
      if (result?.isSuccess) {
        await onSuccess();
        addToast({
          title: "Nouvelle tâche",
          description: `${values.title} ajouté avec succès`,
          color: "success",
        });
        onClose();
      } else {
        console.log(result);

        if (result.error) {
          if (result.error) {
            const errors = Object.entries(result.error.errors).reduce(
              (acc, [field, message]) => {
                acc[field] = message;
                return acc;
              },
              {}
            );
            setServerErrors(errors);
            console.log(errors);
          }
        }
        addToast({
          title: "Ops !",
          description: `Une erreur s'est produite`,
          color: "danger",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nouveau</ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) =>
                  handleSubmit(values, actions, onClose)
                }
              >
                {({
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  values,
                  setFieldValue,
                  errors,
                  touched,
                }) => (
                  <Form>
                    <div style={{ maxHeight: "60vh", overflowX: "auto" }}>
                      <ModalBody>
                        <div className="w-full flex flex-col gap-5">
                          <div>
                            <Input
                              type="text"
                              label="Titre"
                              name="title"
                              value={values.title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.title && !!errors.title}
                              errorMessage={
                                touched.title && errors.title
                                  ? errors.title
                                  : ""
                              }
                            />
                            {serverErrors.title && (
                              <div className="error mb-5">
                                {serverErrors.title}
                              </div>
                            )}
                          </div>

                          <div>
                            <Textarea
                              label="Description"
                              name="description"
                              value={values.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={
                                touched.description && !!errors.description
                              }
                              errorMessage={
                                touched.description && errors.description
                                  ? errors.description
                                  : ""
                              }
                              classNames={{
                                input: "resize-y min-h-[40px]",
                              }}
                            />
                          </div>

                          <div>
                            <DatePicker
                              CalendarTopContent={
                                <Button
                                  fullWidth
                                  className=""
                                  radius="full"
                                  size="sm"
                                  variant="bordered"
                                  onPress={() =>
                                    setFieldValue(
                                      "echeance_date",
                                      today(getLocalTimeZone())
                                    )
                                  }
                                >
                                  Aujourd'hui
                                </Button>
                              }
                              label="Date"
                              name="echeance_date"
                              showMonthAndYearPickers
                              value={values.echeance_date}
                              onChange={(echeance_date) =>
                                setFieldValue("echeance_date", echeance_date)
                              }
                              onBlur={handleBlur}
                              isInvalid={
                                touched.echeance_date && !!errors.echeance_date
                              }
                              errorMessage={
                                touched.echeance_date && errors.echeance_date
                                  ? errors.echeance_date
                                  : ""
                              }
                            />
                          </div>
                        </div>
                      </ModalBody>
                    </div>
                    <ModalFooter>
                      <Button
                        className="px-10"
                        color="danger"
                        variant="ghost"
                        onPress={onClose}
                      >
                        Annuler
                      </Button>
                      <Button
                        className="px-10"
                        type="submit"
                        color="primary"
                        variant="ghost"
                        isLoading={loading ? "isLoading" : null}
                        isDisabled={loading}
                      >
                        Sauvegarder
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
