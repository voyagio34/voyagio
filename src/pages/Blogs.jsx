// src/pages/BlogList.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaCalendarAlt, FaRegClock, FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabase/Client';
import { FaRegMessage } from 'react-icons/fa6';
import Select from "react-select";

const SORT_OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
];

function fmtDate(d) {
    try { return d ? new Date(d).toLocaleDateString() : ''; } catch { return ''; }
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
// ---- card skeleton ----
function CardSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden shadow-sm animate-pulse bg-white">
            <div className="w-full h-48 bg-gray-200" />
            <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 w-2/3 rounded" />
                <div className="h-3 bg-gray-200 w-1/2 rounded" />
                <div className="h-3 bg-gray-200 w-1/3 rounded" />
            </div>
        </div>
    );
}

export default function BlogList() {
    const router = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // query state from URL
    const pageSize = 9;
    const [page, setPage] = useState(Number(searchParams.get('page') || 1));
    const [q, setQ] = useState(searchParams.get('q') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [sort, setSort] = useState(searchParams.get('sort') || 'newest'); // newest|oldest

    // data
    const [posts, setPosts] = useState([]);
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    // keep URL in sync
    useEffect(() => {
        const s = new URLSearchParams();
        if (page > 1) s.set('page', String(page));
        if (q) s.set('q', q);
        if (category && category !== 'All') s.set('category', category);
        if (sort !== 'newest') s.set('sort', sort);
        setSearchParams(s, { replace: true });
    }, [page, q, category, sort]);

    useEffect(() => {
        let alive = true;
        (async () => {
            setLoading(true);

            // categories
            const { data: catRows } = await supabase
                .from('blog_posts')
                .select('category')
                .eq('status', 'published')
                .not('category', 'is', null);

            const uniqueCats = ['All', ...Array.from(new Set((catRows || []).map(r => r.category)))];
            if (!alive) return;
            setCats(uniqueCats);

            // count (for pagination)
            let countQuery = supabase.from('blog_posts').select('*', { count: 'exact', head: true });
            countQuery = countQuery.eq('status', 'published');
            if (category && category !== 'All') countQuery = countQuery.eq('category', category);
            if (q) {
                // simple case-insensitive search across title + author + tags::text
                countQuery = countQuery.or(`title.ilike.%${q}%,author.ilike.%${q}%`);
            }
            const { count: totalCount } = await countQuery;
            if (!alive) return;
            setTotal(totalCount || 0);

            // main list query
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;

            let listQuery = supabase
                .from('blog_posts')
                .select('id,title,author,published_date,main_image,sections,category,tags', { count: 'exact' })
                .eq('status', 'published')
                .range(from, to);

            if (category && category !== 'All') listQuery = listQuery.eq('category', category);
            if (q) listQuery = listQuery.or(`title.ilike.%${q}%,author.ilike.%${q}%`);

            listQuery = listQuery.order('published_date', { ascending: sort === 'oldest' });

            const { data: rows, error } = await listQuery;
            if (!alive) return;
            if (error) console.error(error);
            setPosts(rows || []);
            setLoading(false);
        })();
        return () => { alive = false; };
    }, [page, q, category, sort]);

    const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total]);

    const applyCategory = (c) => {
        setCategory(c);
        setPage(1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        // q already bound to state
    };

    return (
        <div className="bg-gray-50 pt-10">
            {/* Header */}
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

                <div className='flex md:items-center py-20 items-center max-w-7xl sm:mx-auto px-4 sm:px-6 lg:px-8 md:flex-row flex-col gap-8'>
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
                        <form onSubmit={handleSearch} className="flex flex-1/2 mt-4 gap-3 z-10 justify-end w-full">
                            <div className="relative w-full">
                                <input
                                    className="w-full bg-white rounded-full pl-10 pr-4 py-3 outline-none ring-1 ring-gray-200 focus:ring-blue-400"
                                    placeholder="Search articles…"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <Select
                                isDisabled={loading}
                                name="sort"
                                options={SORT_OPTIONS}
                                placeholder="Sort by…"
                                closeMenuOnSelect={true}
                                value={SORT_OPTIONS.find(o => o.value === sort) || null}
                                onChange={(opt) => setSort(opt?.value ?? "newest")}
                                className="react-select-container"
                                classNamePrefix="rs"
                                classNames={{
                                    control: ({ isFocused, isDisabled }) =>
                                        `rounded-2xl border ${isFocused ? 'ring-2 ring-blue-400 border-blue-300' : 'border-gray-200'} bg-gray-50 ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} px-2`,
                                    placeholder: () => "text-gray-400",
                                    input: () => "text-gray-800 w-20 cursor-pointer",
                                    singleValue: () => "text-gray-800",
                                    menu: () => "mt-2 border border-gray-200 shadow-lg rounded-2xl overflow-hidden bg-white",
                                    option: ({ isFocused, isSelected }) => `px-3 py-2 text-sm cursor-pointer ${isSelected ? 'bg-blue-100 text-blue-700' : isFocused ? 'bg-gray-50 ' : ''}`,
                                    dropdownIndicator: () => "text-gray-400 cursor-pointer",
                                    indicatorSeparator: () => "hidden",
                                }}
                                styles={{
                                    control: (base) => ({ ...base, minHeight: 48, borderRadius: 16 }),
                                    menu: (base) => ({ ...base, borderRadius: 16 }),
                                }}
                            />
                        </form>
                    </div>
                    <div
                        className='w-full flex-1/2 flex sm:z-10 justify-end'
                    >
                        <img src="/FeaturesBg.webp" alt="Features" />
                    </div>
                </div>

            </section>


            {/* Content */}
            <section className="min-h-screen mt-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-8">
                    {/* Sidebar categories */}
                    <aside className="lg:col-span-2 md:col-span-2">
                        <div className="rounded-2xl sm:px-6 px-4 py-6 sticky top-8 bg-white shadow-sm">
                            <h2 className="text-xl font-bold mb-6 text-gray-900">Categories</h2>
                            <ul className="space-y-1">
                                {cats.map((c) => (
                                    <li
                                        key={c}
                                        onClick={() => applyCategory(c)}
                                        className={`flex items-center gap-3 py-3 sm:px-4 border-b border-gray-100 last:border-0 cursor-pointer group
                      ${c === category ? 'text-blue-600' : 'text-gray-800'}`}
                                    >
                                        <span className="text-md font-medium group-hover:text-blue-500 group-hover:translate-x-1 duration-200">
                                            {c}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Grid of posts */}
                    <div className="lg:col-span-6 md:col-span-4">
                        {loading ? (
                            <div className="flex flex-wrap gap-6">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="flex-[1_1_320px] min-w-[320px] max-w-[420px]">
                                        <CardSkeleton />
                                    </div>
                                ))}
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-gray-600">No posts found.</div>
                        ) : (
                            <>
                                {/* Cards: flex-wrap + min width so they don't squish */}
                                <div className="flex flex-wrap md:justify-start justify-center gap-4 mx-auto items-stretch">
                                    {posts.map((p) => {
                                        const img = resolveHeroImage(p);
                                        const d = fmtDate(p.published_date);
                                        return (
                                            <article
                                                key={p.id}
                                                className="flex-[1_1_320px] min-w-[320px] max-w-[420px] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-white cursor-pointer flex flex-col"
                                            >
                                                <Link to={`/blog/${p.id}`}>
                                                    <img src={img} alt={p.title} className="w-full h-48 object-cover" />
                                                </Link>

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
                                                        <span className="flex items-center gap-1">
                                                            <FaRegMessage className="w-3 h-3" />
                                                            0 comments
                                                        </span>
                                                    </div>

                                                    <Link to={`/blog/${p.id}`}>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                                            {p.title}
                                                        </h3>
                                                    </Link>

                                                    {p.tags && p.tags.length > 0 && (
                                                        <>
                                                            <div className="flex flex-wrap gap-2 mt-3">
                                                                {p.tags.slice(0, 3).map((t) => (
                                                                    <span
                                                                        key={t}
                                                                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                                                                    >
                                                                        {t}
                                                                    </span>
                                                                ))}
                                                            </div>

                                                            <div className="mt-4 flex  gap-4 justify-between items-center pt-4 border-t">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                                                                        <img src="/agent.webp" alt="user" />
                                                                    </div>
                                                                    <span className="text-sm font-medium text-gray-700">
                                                                        {p.author || 'Editorial Team'}
                                                                    </span>
                                                                </div>

                                                                <div className="flex">
                                                                    <Link
                                                                        to={`/blog/${p.id}`}
                                                                        className="text-sm bg-gray-200 max-w-32 text-center px-4 py-2 rounded-full font-semibold text-gray-900 hover:text-blue-600"
                                                                    >
                                                                        Keep Reading
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>

                                {/* Pagination */}
                                <div className="flex items-center justify-center gap-3 mt-10">
                                    <button
                                        className="px-4 py-2 rounded-full bg-white ring-1 ring-gray-200 hover:ring-blue-400 disabled:opacity-50 cursor-pointer"
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page <= 1}
                                    >
                                        Prev
                                    </button>
                                    <span className="text-gray-700">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        className="px-4 py-2 rounded-full bg-white ring-1 ring-gray-200 hover:ring-blue-400 disabled:opacity-50 cursor-pointer"
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page >= totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </section>

            {/* CTA footer (same theme) */}
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
