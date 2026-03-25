import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "../../components/ui/pagination";


interface PaginationControlsProps {
    currentPage: number;
    pageAmt: number;
    onPageChange: (page: number) => void;
};

export default function PaginationControls( { currentPage, pageAmt, onPageChange }: PaginationControlsProps) {
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > pageAmt) {
        endPage = pageAmt;
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const handlePageClick = (page: number) => {
        onPageChange(page)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handlePrevious = () => {
        if (currentPage === 1) return;
        onPageChange(currentPage - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleNext = () => {
        if (currentPage === pageAmt) return;
        onPageChange(currentPage + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Pagination>
            <PaginationContent className="min-h-[40px] items-center">
                <PaginationItem>
                    <PaginationPrevious size="lg" className="cursor-pointer" onClick={handlePrevious} />
                </PaginationItem>

                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                    const page = startPage + i;
                    return (
                        <PaginationItem
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                                currentPage === page ? "bg-emerald-600 text-white" : "hover:bg-gray-200"
                            }`}
                        >
                            {page}
                        </PaginationItem>
                    );
                })}

                {endPage < pageAmt && (
                    <>
                        {endPage < pageAmt - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem
                            key={pageAmt}
                            onClick={() => onPageChange(pageAmt)}
                            className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                                currentPage === pageAmt ? "bg-emerald-600 text-white" : "hover:bg-gray-200"
                            }`}
                        >
                            {pageAmt}
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext size="lg" className="cursor-pointer" onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );

}