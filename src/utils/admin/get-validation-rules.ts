import { DEFAULT_VALIDATE_MESSAGE } from "constants/general-constants";
import {
  solutionFilePrefixesValidation,
  solutionFilesTableDataIndexes,
} from "constants/solution-files-constants";

import { IFormItem, TRecordStringObject } from "types";

interface IGetValidationRulesProps {
  formItem: IFormItem;
  editingEntity: TRecordStringObject | null;
}

const validatePrefixValue = (args: TRecordStringObject) => {
  const { value, validationPrefix } = args;

  const isValid = value?.startsWith(validationPrefix);
  const isValidLength = value.length > validationPrefix.length;

  return isValid && isValidLength;
};

const getPrefixValidationError = (prefix: string) => {
  return `Должно начинаться с '${prefix}' и содержать любой латинский символ после него.`;
};

export const getValidationRules = (props: IGetValidationRulesProps) => {
  const { formItem, editingEntity } = props;

  const nodeDefaultValue = formItem.node?.props?.defaultValue;

  const validationPrefix =
    solutionFilePrefixesValidation[
      nodeDefaultValue as keyof typeof solutionFilePrefixesValidation
    ];

  if (formItem.name === solutionFilesTableDataIndexes.filePath) {
    return [];
  }

  return [
    {
      required: !editingEntity,
      message: DEFAULT_VALIDATE_MESSAGE,
    },
    ...(validationPrefix
      ? [
          {
            validator: (_: unknown, value: string) => {
              if (!validatePrefixValue({ value, validationPrefix })) {
                return Promise.reject(
                  getPrefixValidationError(validationPrefix)
                );
              }

              return Promise.resolve();
            },
          },
        ]
      : []),
  ];
};
