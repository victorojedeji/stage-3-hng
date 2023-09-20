import { useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
import { GALLERY } from '../../lib/routes';

export default function IndexPage() {
  const navigate = useNavigate();

  useEffect(() => {
      navigate(GALLERY);
  }, []);

  return (
    <div></div>
  )
}
