import React from 'react';
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IletisimFormu from './IletisimFormu';

test('hata olmadan render ediliyor', () => {
    render(<IletisimFormu/>);
});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu/>);
    const title = screen.getByTestId("form-title");
    expect(title).toBeInTheDocument();
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu/>);
    const isimAlani = screen.getByTestId("isim-input");
    fireEvent.change(isimAlani, {target: {value:"hey"}});

    const isimHatasi = screen.getByTestId("error-isim");
    expect(isimHatasi).toBeInTheDocument();
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />);
  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const isimHatasi = screen.getByTestId("error-isim");
  expect(isimHatasi).toBeInTheDocument();

  const soyadHatasi = screen.getByTestId("error-soyad");
  expect(soyadHatasi).toBeInTheDocument();

  const emailHatasi = screen.getByTestId("error-email");
  expect(emailHatasi).toBeInTheDocument();
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />);
    const isimAlani = screen.getByTestId("isim-input");
    fireEvent.change(isimAlani, {target: {value:"zeker"}});

    const soyadAlani = screen.getByTestId("soyad-input");
    fireEvent.change(soyadAlani, {target: {value:"reisoglu"}});

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    const emailHatasi = screen.getByTestId("error-email");
  expect(emailHatasi).toBeInTheDocument();
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
  const emailAlani = screen.getByTestId("email-input");
  fireEvent.change(emailAlani, { target: { value: "zeker.com" } });
  expect(emailAlani.value).toBe("zeker.com");

  const emailHatasi = screen.getByTestId("error-email");
  expect(emailHatasi).toBeInTheDocument();
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu />);

  const isimAlani = screen.getByTestId("isim-input");
  fireEvent.change(isimAlani, { target: { value: "zeker" } });
  expect(isimAlani.value).toBe("zeker");

  const emailAlani = screen.getByTestId("email-input");
  fireEvent.change(emailAlani, { target: { value: "zeker@outlook.com" } });
  expect(emailAlani.value).toBe("zeker@outlook.com");

  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const soyadHatasi = screen.getByTestId("error-soyad");
  expect(soyadHatasi).toBeInTheDocument();
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {

});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    
    const isimAlani = screen.getByTestId("isim-input");
    fireEvent.change(isimAlani, {target: {value:"zeker"}});
    

    const soyadAlani = screen.getByTestId("soyad-input");
    fireEvent.change(soyadAlani, {target: {value:"reis"}});
    

    const emailAlani = screen.getByTestId("email-input");
    fireEvent.change(emailAlani, {target: {value:"zeker@outlook.com"}});
    

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    const displayer = screen.getByTestId("sent-data");
    expect(displayer).toBeInTheDocument();

    
});