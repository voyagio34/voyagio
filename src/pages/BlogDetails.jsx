// BlogDetails.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { FaArrowRight, FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { FaRegMessage } from 'react-icons/fa6';
import { supabase } from '../lib/supabase/Client';
import RoundLoader from '../components/RoundLoader';

function splitParagraphs(text) {
    return (text || '').split(/\r?\n\r?\n/).filter(Boolean);
}

function resolveHeroImage(post, fallback = '/images/default-hero.jpg') {
    if (post?.main_image) return post.main_image;
    const secs = post?.sections || [];
    for (const s of secs) {
        const first = s?.images?.[0];
        if (first) return first;
    }
    return fallback;
}
function BlogDetails() {
    const { id } = useParams(); // expects /blog/:id
    const router = useNavigate();

    const [post, setPost] = useState(null);
    const [recent, setRecent] = useState([]);
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        (async () => {
            setLoading(true);

            // 1) fetch the current post
            const { data: row, error: postErr } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', id)
                .maybeSingle();

            if (!alive) return;
            if (postErr) console.error(postErr);
            setPost(row || null);

            // 2) recent posts (other published ones)
            const { data: recentRows } = await supabase
                .from('blog_posts')
                .select('id,title,author,published_date,main_image,sections,category,tags')
                .eq('status', 'published')
                .neq('id', id)
                .order('published_date', { ascending: false })
                .limit(3);

            if (!alive) return;
            setRecent(recentRows || []);

            // 3) categories (distinct)
            const { data: catRows } = await supabase
                .from('blog_posts')
                .select('category')
                .not('category', 'is', null);

            if (!alive) return;
            const uniq = Array.from(new Set((catRows || []).map(r => r.category)));
            setCats(uniq);

            setLoading(false);
        })();

        return () => {
            alive = false;
        };
    }, [id]);

    const hero = useMemo(() => resolveHeroImage(post), [post]);

    if (loading) {
        return (
           <RoundLoader/>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Blog not found.
            </div>
        );
    }

    const dateLabel = post.published_date
        ? new Date(post.published_date).toLocaleDateString()
        : '';

    return (
        <div className="bg-gray-50">
            {/* Header hero */}
            <section className="relative overflow-x-hidden bg-cover bg-center bg-blue-200/30 px-4 sm:px-6 lg:px-8 w-full" data-aos="fade-in">
                <div
                    className="absolute top-20 -left-20 w-46 h-46 bg-gray-200 rounded-full z-0"
                />
                <div
                    className="absolute sm:block hidden top-2 right-4 w-50 h-50 bg-gray-200 rounded-full z-0"
                />
                <div
                    className="absolute sm:bottom-20 bottom-10 sm:right-20 -right-5 w-26 h-26 bg-blue-500/60 rounded-full z-0"
                />
                <div
                    className="absolute sm:block hidden bottom-10 left-10 w-20 h-20 bg-blue-200 rounded-full z-0"
                />

                <div className='flex md:items-center py-20 items-start max-w-7xl sm:mx-auto px-4 sm:px-6 lg:px-8 md:flex-row flex-col gap-8'>
                    <div
                        className='flex flex-1/2 flex-col z-10'
                    >
                        <h1 className='font-bold flex sm:text-5xl text-4xl'>
                            Blog
                            <span className='ml-4 text-blue-500'>Details</span>
                        </h1>
                        <span className='ml-1 font-normal text-lg text-gray-700 mt-2'>
                            Home / Blog Details
                        </span>
                    </div>
                    <div
                        className='w-full flex-1/2 flex z-10 justify-end'
                    >
                        <img src="/FeaturesBg.webp" alt="Features" />
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="min-h-screen mt-10" data-aos="fade-in">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Article meta + big hero */}
                    <article className="rounded-2xl overflow-hidden mb-10">
                        <img
                            src={hero}
                            alt="hero"
                            className="w-full h-full rounded-2xl sm:h-96 object-cover"
                        />

                        <div className="flex flex-wrap gap-4 sm:gap-6 pt-6 text-md text-gray-600">
                            {dateLabel && (
                                <span className="flex items-center gap-2">
                                    <FaCalendarAlt className="w-4 h-4" />
                                    {dateLabel}
                                </span>
                            )}
                            <span className="flex items-center gap-2">
                                <FaRegClock className="w-4 h-4" />
                                ~6 mins
                            </span>
                            <span className="flex items-center gap-2">
                                <FaRegMessage className="w-4 h-4" />
                                0 comments
                            </span>
                        </div>

                        <div className="py-6">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                                {post.title}
                            </h1>
                            {/* {splitParagraphs(post.sections?.[0]?.content)
                                .slice(0, 1)
                                .map((p, i) => (
                                    <p key={i} className="text-gray-600 text-justify leading-relaxed mb-4">
                                        {p}
                                    </p>
                                ))} */}
                        </div>
                    </article>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl">
                                {(post.sections || []).map((sec, idx) => (
                                    <section key={idx} className="mb-10">
                                        {sec.subtitle ? (
                                            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                                {sec.subtitle}
                                            </h2>
                                        ) : null}

                                        {splitParagraphs(sec.content).map((p, i) => (
                                            <p key={i} className="text-gray-600 text-justify leading-relaxed mb-4">
                                                {p}
                                            </p>
                                        ))}

                                        {(sec.images || []).length > 0 && (

                                            <img
                                                src={sec.images[0]}
                                                alt={sec.subtitle || `section-${idx}-img-${0}`}
                                                className="w-full max-h-72 object-cover rounded-2xl"
                                            />

                                        )}
                                    </section>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="rounded-2xl sm:px-6 px-2 py-6 sticky top-8">
                                <h2 className="text-xl font-bold mb-6 text-gray-900">Categories :</h2>
                                <ul className="space-y-1">
                                    {cats.map((c) => (
                                        <li
                                            key={c}
                                            className="flex flex-row items-center gap-3 py-3 sm:px-4 border-b border-gray-100 last:border-0 cursor-pointer group"
                                            onClick={() => router(`/blog?category=${encodeURIComponent(c)}`)}
                                        >
                                            <span className="text-md font-medium group-hover:text-blue-500 group-hover:translate-x-1 duration-200">
                                                {c}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Recent Posts */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-bold mb-6 text-gray-900">Recent Posts :</h3>
                                    <div className="space-y-4">
                                        {recent.map((p) => {
                                            const img = resolveHeroImage(p);
                                            const d = p.published_date
                                                ? new Date(p.published_date).toLocaleDateString()
                                                : '';
                                            return (
                                                <div
                                                    key={p.id}
                                                    className="flex flex-row gap-3 transition-all group hover:translate-x-1 duration-200 cursor-pointer"
                                                    onClick={() => router(`/blog/${(p.id)}`)}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={p.title}
                                                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                            {p.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mt-1">{d}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* “Our Blogs” grid (optional): reuse `recent` or fetch paginated list */}
                    <div className="relative py-20">
                        <div className="flex sm:flex-row flex-col justify-between sm:items-center mb-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Blogs</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Explore more posts from our editors.
                                </p>
                            </div>

                            <button
                                className="mt-6 md:mt-0 bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors duration-200 max-w-40 justify-center group cursor-pointer"
                                onClick={() => router('/blog')}
                            >
                                View More
                                <FaArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 items-stretch">
                            {(recent || []).map((p) => {
                                const img = resolveHeroImage(p);
                                const d = p.published_date ? new Date(p.published_date).toLocaleDateString() : '';
                                return (
                                    <article
                                        key={p.id}
                                        className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer
                   h-full flex flex-col"
                                        onClick={() => router(`/blog/${p.id}`)}
                                    >
                                        <img src={img} alt={p.title} className="w-full h-48 object-cover" />

                                        {/* make content a flex column that grows */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <FaCalendarAlt className="w-3 h-3" />
                                                    {d}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaRegClock className="w-3 h-3" />
                                                    ~6 mins
                                                </span>
                                                {/* <span className="flex items-center gap-1">
                                                    <FaRegMessage className="w-3 h-3" />
                                                    0 comments
                                                </span> */}
                                            </div>

                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
                                                {p.title}
                                            </h3>

                                            {p.tags && p.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {p.tags.slice(0, 3).map((t) => (
                                                        <span
                                                            key={t}
                                                            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {/* footer sticks to bottom */}
                                            <div className="mt-auto pt-4 border-t flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                                                        <img src="/agent.webp" alt="user" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {p.author || 'Editorial Team'}
                                                    </span>
                                                </div>
                                                <span className="text-sm bg-gray-200 px-4 py-2 rounded-full font-semibold text-gray-900">
                                                    Keep Reading
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA footer */}
            <section className="relative bg-gray-200 py-10">
                <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between gap-8">
                    <div className="flex flex-col">
                        <span className="text-lg text-blue-500 font-bold">🌍 Download the Voyagio AI™ App</span>
                        <span className="text-md max-w-lg mt-2 px-1 text-gray-700 font-medium">
                            Plan, personalize, and book your entire trip in seconds with the power of AI — all from one smart, seamless app.
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-4">
                            <img src="/appstore.webp" alt="appstore" className="h-10" />
                            <img src="/qrcode.webp" alt="qrcode" className="h-10" />
                        </div>
                        <div className="flex gap-4">
                            <img src="/playstore.webp" alt="appstore" className="h-10" />
                            <img src="/qrcode.webp" alt="qrcode" className="h-10" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BlogDetails;
