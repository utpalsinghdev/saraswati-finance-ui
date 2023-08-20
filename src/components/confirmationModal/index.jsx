import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ConfirmationModal(props) {
  const {
    title = "Are you sure?",
    description = "Do you really want to delete this data?",
    confirmationButtonText = "Delete",
    open,
    setOpen,
    isDelete,
    onDelete,
    firstBtn = "Cancel",
  } = props;

  const cancelButtonRef = useRef(null);
  const nothing = () => {};
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen({
            id: null,
            status: false,
          });
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div
                    className={`flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto ${
                      isDelete === true ? "bg-red-100" : "bg-indigo-100"
                    } rounded-full sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    <ExclamationTriangleIcon
                      className={`w-6 h-6 ${
                        isDelete === true ? "text-red-600" : "text-indigo-600"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="hidden md:flex text-sm text-gray-500">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 gap-2 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={`inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-white${
                      isDelete === true
                        ? " bg-red-600 hover:bg-red-700 focus:ring-red-500 "
                        : " bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 "
                    }  border border-transparent rounded-md shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm`}
                    onClick={async () => {
                      onDelete ? await onDelete() : nothing();
                      setOpen({
                        id: null,
                        status: false,
                      });
                    }}
                  >
                    {confirmationButtonText}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpen({
                        id: null,
                        status: false,
                      });
                    }}
                    ref={cancelButtonRef}
                  >
                    {firstBtn ? firstBtn : "Cancel"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
