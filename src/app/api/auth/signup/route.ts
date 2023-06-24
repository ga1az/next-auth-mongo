import { NextResponse } from 'next/server';
import User from '@/models/user'
import bycrypt from 'bcryptjs'
import { Connect } from '@/libs/mongodb';

export async function POST(request: Request) {
  const { fullname, email, password } = await request.json();

  if (!fullname || !email || !password) {
    return NextResponse.json({ message: 'Please fill all fields' }, { status: 400 });
  } else if (password.length < 6) {
    return NextResponse.json({ message: 'Password should be at least 6 characters' }, { status: 400 });
  }
  console.log(fullname, email, password)
  try {
    await Connect();
    const userFount = await User.findOne({ email });

    if (userFount) return NextResponse.json({ message: 'User already exists' }, { status: 400 });

    const hashedPass = await bycrypt.hash(password, 12);

    const user = await new User({ email: email, fullname: fullname, password: hashedPass }).save();

    console.log(user)
    return NextResponse.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }

}