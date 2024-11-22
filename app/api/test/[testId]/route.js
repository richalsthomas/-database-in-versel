import { NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

let sampleData = {
  name: "John Doe",
  age: 25,
};

const prisma = new PrismaClient();

const dataSchema = z.object({
  text: z.string().min(1),
  textMore: z.string().min(1),
});

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit") ?? 3;
    const offset = searchParams.get("offset") ?? 0;
    const tasks = await prisma.task.findMany({
      take: parseInt(limit),
      skip: parseInt(offset),
    });
    return NextResponse.json(
      {
        count: await prisma.task.count(),
        data: tasks,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const searchParams = request.nextUrl.searchParams;

    try {
      dataSchema.parse(body);
    } catch (e) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    await prisma.task.create({
      data: {
        task: body.text,
      },
    });
    const { testId } = params;
    const auth = request.headers.get("Authorization");
    const tasks = await prisma.task.findMany();
    return NextResponse.json(
      {
        ...sampleData,
        ...body,
        testId,
        auth,
        aaa: searchParams.get("text1"),
        tasks,
      },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
