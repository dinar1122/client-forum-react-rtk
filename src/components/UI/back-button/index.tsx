import { Button } from '@nextui-org/react';
import React from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="ghost"
      color="default"
      onClick={handleGoBack}
      className="text-gray-500 text-lg flex items-center gap-2 mb-10 cursor-pointer border-none font-semibold w-min self-end"
    >
      <FaRegArrowAltCircleLeft />
      Назад
    </Button>
  );
};
