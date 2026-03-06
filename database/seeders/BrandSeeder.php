<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;
use Illuminate\Support\Str;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Maersk',
                'slug' => 'maersk',
                'description' => 'A.P. Moller - Maersk is an integrated transport and logistics company',
                'is_active' => true,
                'meta_title' => 'Maersk Shipping Services',
                'meta_description' => 'Maersk container shipping and logistics services'
            ],
            [
                'name' => 'MSC',
                'slug' => 'msc',
                'description' => 'Mediterranean Shipping Company is a global container shipping line',
                'is_active' => true,
                'meta_title' => 'MSC Shipping Services',
                'meta_description' => 'MSC container shipping and global logistics services'
            ],
            [
                'name' => 'CMA CGM',
                'slug' => 'cma-cgm',
                'description' => 'CMA CGM is a worldwide container shipping group',
                'is_active' => true,
                'meta_title' => 'CMA CGM Shipping Services',
                'meta_description' => 'CMA CGM container shipping and maritime transport services'
            ],
            [
                'name' => 'COSCO Shipping',
                'slug' => 'cosco-shipping',
                'description' => 'COSCO Shipping Lines is a Chinese state-owned shipping company',
                'is_active' => true,
                'meta_title' => 'COSCO Shipping Services',
                'meta_description' => 'COSCO Shipping container transport and logistics services'
            ],
            [
                'name' => 'Hapag-Lloyd',
                'slug' => 'hapag-lloyd',
                'description' => 'Hapag-Lloyd is a German international shipping and container transportation company',
                'is_active' => true,
                'meta_title' => 'Hapag-Lloyd Shipping Services',
                'meta_description' => 'Hapag-Lloyd container shipping and freight services'
            ],
            [
                'name' => 'Evergreen Marine',
                'slug' => 'evergreen-marine',
                'description' => 'Evergreen Marine Corporation is a Taiwanese container shipping company',
                'is_active' => true,
                'meta_title' => 'Evergreen Marine Shipping Services',
                'meta_description' => 'Evergreen Marine container shipping and transport services'
            ],
            [
                'name' => 'ONE',
                'slug' => 'one',
                'description' => 'Ocean Network Express is a Japanese container shipping company',
                'is_active' => true,
                'meta_title' => 'ONE Shipping Services',
                'meta_description' => 'ONE Ocean Network Express container shipping services'
            ],
            [
                'name' => 'Yang Ming Marine Transport',
                'slug' => 'yang-ming',
                'description' => 'Yang Ming Marine Transport Corporation is a Taiwanese shipping company',
                'is_active' => true,
                'meta_title' => 'Yang Ming Shipping Services',
                'meta_description' => 'Yang Ming Marine container shipping and transport services'
            ],
            [
                'name' => 'HMM',
                'slug' => 'hmm',
                'description' => 'HMM is a South Korean shipping and transportation company',
                'is_active' => true,
                'meta_title' => 'HMM Shipping Services',
                'meta_description' => 'HMM container shipping and maritime transport services'
            ],
            [
                'name' => 'ZIM Integrated Shipping Services',
                'slug' => 'zim',
                'description' => 'ZIM is an Israeli container shipping company',
                'is_active' => true,
                'meta_title' => 'ZIM Shipping Services',
                'meta_description' => 'ZIM Integrated Shipping container transport services'
            ],
            [
                'name' => 'Wan Hai Lines',
                'slug' => 'wan-hai-lines',
                'description' => 'Wan Hai Lines is a Taiwanese container shipping company',
                'is_active' => true,
                'meta_title' => 'Wan Hai Lines Shipping Services',
                'meta_description' => 'Wan Hai Lines container shipping and logistics services'
            ],
            [
                'name' => 'Pacific International Lines',
                'slug' => 'pacific-international-lines',
                'description' => 'Pacific International Lines is a Singaporean container shipping company',
                'is_active' => true,
                'meta_title' => 'Pacific International Lines Shipping Services',
                'meta_description' => 'PIL container shipping and maritime transport services'
            ]
        ];

        foreach ($brands as $brandData) {
            Brand::create($brandData);
        }
    }
}
