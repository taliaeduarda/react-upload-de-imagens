/* eslint-disable prettier/prettier */

import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type UploadImageFormData = {
  title: string;
  description: string;
  url: string;
};

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
    },
    title: {
      required: true || 'Título obrigatório',
      minLength: 2 || 'Mínimo de 2 caracteres',
      maxLength: 20 || 'Máximo de 20 caracteres',
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: 65 || 'Máximo de 65 caracteres'
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (values: UploadImageFormData) => {
      const response = await api.post("/api/images", values);
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("images");
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: UploadImageFormData): Promise<void> => {
    try {
      if (!imageUrl) {
        toast({
          title: "Imagem não adicionada",
          description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro",
          status: "info",
        })
      }
      else {
        const image = {
          title: data.title,
          description: data.description,
          url: imageUrl
        }
        await mutation.mutateAsync(image);
        toast({
          title: "Imagem cadastrada",
          description: "Sua imagem foi cadastrada com sucesso",
          status: "success",
        })
      }
    } catch {
      toast({
        title: "Falha no cadastro",
        description: "Ocorreu um erro ao tentar cadastrar a sua imagem.",
        status: "error",
      })
    } finally {
      reset()
      closeModal()
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image}
          {...register('image', formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          error={errors.title}
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          error={errors.description}
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
