import { PrismaClient, Role, PostStatus, CommentStatus } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "mtzallqmy@gmail.com" },
    update: {
      name: "معتز العلقمي",
      role: Role.admin,
      password: hashPassword("moataz775@#")
    },
    create: {
      email: "mtzallqmy@gmail.com",
      name: "معتز العلقمي",
      role: Role.admin,
      password: hashPassword("moataz775@#")
    }
  });

  const category = await prisma.category.upsert({
    where: { slug: "tech" },
    update: {},
    create: {
      name: "تقنية",
      slug: "tech",
      description: "تقنيات، تطوير، ومقالات عملية."
    }
  });

  const tag = await prisma.tag.upsert({
    where: { slug: "nextjs" },
    update: {},
    create: { name: "Next.js", slug: "nextjs" }
  });

  const post = await prisma.post.upsert({
    where: { slug: "welcome-to-mouaz-blog" },
    update: {},
    create: {
      title: "مرحبًا بك في مدونة معتز العلقمي",
      slug: "welcome-to-mouaz-blog",
      excerpt: "نسخة منظمة ومهيأة للنشر على Vercel مع نظام دخول داخلي وإدارة مستخدمين.",
      content: "<p>هذه نسخة محدثة من المدونة تدعم الدخول بالبريد وكلمة المرور للأدمن والمحررين والزوار.</p>",
      status: PostStatus.published,
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: category.id,
      seoTitle: "مدونة معتز العلقمي",
      seoDescription: "مدونة عربية حديثة مع لوحة تحكم وإدارة مستخدمين."
    }
  });

  await prisma.postTag.createMany({
    data: [{ postId: post.id, tagId: tag.id }],
    skipDuplicates: true
  });

  await prisma.comment.create({
    data: {
      content: "تعليق تجريبي جاهز للمراجعة.",
      status: CommentStatus.pending,
      postId: post.id,
      name: "زائر"
    }
  });

  await prisma.siteSetting.upsert({
    where: { key: "site" },
    update: {},
    create: {
      key: "site",
      value: {
        siteName: "معتز العلقمي",
        siteDescription: "مدونة عربية احترافية",
        copyrightText: "جميع الحقوق محفوظة لدى معتز العلقمي 2026",
        socialLinks: {
          whatsapp: process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP ?? "",
          facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "",
          telegram: process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM ?? "",
          twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER ?? "",
          instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? ""
        }
      },
      updatedById: admin.id
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
